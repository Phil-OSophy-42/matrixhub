# Copyright 2024 The Kubernetes Authors.
# Copyright 2026 The MatrixHub Authors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Use go.mod go version as source.
GINKGO_VERSION ?= $(shell cd $(TOOLS_DIR); $(GO_CMD) list -m -f '{{.Version}}' github.com/onsi/ginkgo/v2)
GOLANGCI_LINT_VERSION ?= $(shell cd $(TOOLS_DIR); $(GO_CMD) list -m -f '{{.Version}}' github.com/golangci/golangci-lint/v2)
CONTROLLER_GEN_VERSION ?= $(shell cd $(TOOLS_DIR); $(GO_CMD) list -m -f '{{.Version}}' sigs.k8s.io/controller-tools)
KUSTOMIZE_VERSION ?= $(shell cd $(TOOLS_DIR); $(GO_CMD) list -m -f '{{.Version}}' sigs.k8s.io/kustomize/kustomize/v5)
ENVTEST_VERSION ?= $(shell cd $(TOOLS_DIR); $(GO_CMD) list -m -f '{{.Version}}' sigs.k8s.io/controller-runtime/tools/setup-envtest)
GOTESTSUM_VERSION ?= $(shell cd $(TOOLS_DIR); $(GO_CMD) list -m -f '{{.Version}}' gotest.tools/gotestsum)
KIND_VERSION ?= $(shell cd $(TOOLS_DIR); $(GO_CMD) list -m -f '{{.Version}}' sigs.k8s.io/kind)
YQ_VERSION ?= $(shell cd $(TOOLS_DIR); $(GO_CMD) list -m -f '{{.Version}}' github.com/mikefarah/yq/v4)
HELM_VERSION ?= $(shell cd $(TOOLS_DIR); $(GO_CMD) list -m -f '{{.Version}}' helm.sh/helm/v4)
HELM_UNITTEST_PLUGIN_VERSION ?= $(shell cd $(TOOLS_DIR); $(GO_CMD) list -m -f '{{.Version}}' github.com/helm-unittest/helm-unittest)
HUGO_VERSION ?= $(shell cd $(TOOLS_DIR); $(GO_CMD) list -m -f '{{.Version}}' github.com/gohugoio/hugo)
MDTOC_VERSION ?= $(shell cd $(TOOLS_DIR); $(GO_CMD) list -m -f '{{.Version}}' sigs.k8s.io/mdtoc)
HELM_DOCS_VERSION ?= $(shell cd $(TOOLS_DIR); $(GO_CMD) list -m -f '{{.Version}}' github.com/norwoodj/helm-docs)
MOCKGEN_VERSION ?= $(shell cd $(TOOLS_DIR); $(GO_CMD) list -m -f '{{.Version}}' go.uber.org/mock)

GOLANGCI_LINT = $(BIN_DIR)/golangci-lint
CONTROLLER_GEN = $(BIN_DIR)/controller-gen
KUSTOMIZE = $(BIN_DIR)/kustomize
GINKGO = $(BIN_DIR)/ginkgo
GOTESTSUM = $(BIN_DIR)/gotestsum
KIND = $(BIN_DIR)/kind
ENVTEST = $(BIN_DIR)/setup-envtest
YQ = $(BIN_DIR)/yq
HELM = $(BIN_DIR)/helm
HUGO = $(BIN_DIR)/hugo
MDTOC = $(BIN_DIR)/mdtoc
HELM_DOCS = $(BIN_DIR)/helm-docs
MOCKGEN = $(BIN_DIR)/mockgen

##@ Tools

.PHONY: golangci-lint
golangci-lint: ## Download golangci-lint locally if necessary.
	@GOBIN=$(BIN_DIR) GO111MODULE=on $(GO_CMD) install github.com/golangci/golangci-lint/v2/cmd/golangci-lint@$(GOLANGCI_LINT_VERSION)

.PHONY: kustomize
kustomize: ## Download kustomize locally if necessary.
	@GOBIN=$(BIN_DIR) GO111MODULE=on $(GO_CMD) install sigs.k8s.io/kustomize/kustomize/v5@$(KUSTOMIZE_VERSION)

.PHONY: ginkgo
ginkgo: ## Download ginkgo locally if necessary.
	@GOBIN=$(BIN_DIR) GO111MODULE=on $(GO_CMD) install github.com/onsi/ginkgo/v2/ginkgo@$(GINKGO_VERSION)

.PHONY: gotestsum
gotestsum: ## Download gotestsum locally if necessary.
	@GOBIN=$(BIN_DIR) GO111MODULE=on $(GO_CMD) install gotest.tools/gotestsum@$(GOTESTSUM_VERSION)

.PHONY: kind
kind: ## Download kind locally if necessary.
	@GOBIN=$(BIN_DIR) GO111MODULE=on $(GO_CMD) install sigs.k8s.io/kind@$(KIND_VERSION)

.PHONY: yq
yq: ## Download yq locally if necessary.
	@GOBIN=$(BIN_DIR) GO111MODULE=on $(GO_CMD) install github.com/mikefarah/yq/v4@$(YQ_VERSION)

.PHONY: helm
helm: ## Download helm locally if necessary.
	@GOBIN=$(BIN_DIR) GO111MODULE=on $(GO_CMD) install helm.sh/helm/v4/cmd/helm@$(HELM_VERSION)

.PHONY: helm-unittest-plugin
helm-unittest-plugin: ## Download helm-unittest locally if necessary.
	@if ! HELM_PLUGINS=$(BIN_DIR)/helm-plugins $(HELM) plugin list | grep -q unittest; then \
		HELM_PLUGINS=$(BIN_DIR)/helm-plugins $(HELM) plugin install https://github.com/helm-unittest/helm-unittest.git --version $(HELM_UNITTEST_PLUGIN_VERSION); \
	fi

.PHONY: helm-docs
helm-docs: ## Download helm-docs locally if necessary.
	@GOBIN=$(BIN_DIR) CGO_ENABLED=1 $(GO_CMD) install github.com/norwoodj/helm-docs/cmd/helm-docs@$(HELM_DOCS_VERSION)

.PHONY: mockgen
mockgen: ## Download mockgen locally if necessary.
	@GOBIN=$(BIN_DIR) CGO_ENABLED=1 $(GO_CMD) install go.uber.org/mock/mockgen@$(MOCKGEN_VERSION)
