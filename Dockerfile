ARG ALPINE_VERSION=3.23
ARG NODE_VERSION=25.2
ARG GO_VERSION=1.25

ARG BASE_IMAGE_PREFIX=docker.io
ARG BASE_IMAGE=${BASE_IMAGE_PREFIX}/library/alpine:${ALPINE_VERSION}

ARG NPM_CONFIG_REGISTRY=https://registry.npmjs.org
ARG GOPROXY=https://proxy.golang.org,direct
ARG HTTP_PROXY
ARG HTTPS_PROXY

##########################################

FROM ${BASE_IMAGE_PREFIX}/library/node:${NODE_VERSION} AS builder

WORKDIR /app

ARG NPM_CONFIG_REGISTRY
ENV NPM_CONFIG_REGISTRY=${NPM_CONFIG_REGISTRY}
ARG GO_VERSION
ENV GO_VERSION=${GO_VERSION}
ARG GOPROXY
ENV GOPROXY=${GOPROXY}
ARG HTTP_PROXY
ENV HTTP_PROXY=${HTTP_PROXY}
ARG HTTPS_PROXY
ENV HTTPS_PROXY=${HTTPS_PROXY}

# Download and install specified Go version (resolves to latest patch version)
RUN ARCH=$(arch | sed 's|x86_64|amd64|g' | sed 's|aarch64|arm64|g') && \
    GO_FULL_VERSION=$(curl -sSfL https://go.dev/dl/?mode=json | grep -o "go${GO_VERSION}[^\"]*" | head -1 | sed 's/go//') && \
    curl -sSfL https://go.dev/dl/go${GO_FULL_VERSION}.linux-${ARCH}.tar.gz | \
    tar -xzf - -C /usr/local
ENV PATH="/usr/local/go/bin:$PATH"

COPY . /app

ARG GIT_TAG GIT_COMMIT TARGETARCH CGO_ENABLED=0

RUN --mount=type=cache,target=/app/node_modules \
    --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/go/pkg/mod \
    --mount=type=bind,source=./go.mod,target=/app/go.mod \
    --mount=type=bind,source=./go.sum,target=/app/go.sum \
    make build GIT_TAG="${GIT_TAG}" GIT_COMMIT="${GIT_COMMIT}" GO_BUILD_ENV="GOARCH=${TARGETARCH} CGO_ENABLED=${CGO_ENABLED}"

##########################################

FROM ${BASE_IMAGE} AS matrixhub

RUN --mount=type=cache,target=/var/cache/apk \
    apk add ca-certificates git && \
    update-ca-certificates

COPY --from=builder /app/bin/matrixhub /usr/local/bin/matrixhub

EXPOSE 9527

ENTRYPOINT ["/usr/local/bin/matrixhub"]
