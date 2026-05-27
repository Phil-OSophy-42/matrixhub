# 内网自动部署 MatrixHub 实施方案

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** GitHub main 分支有变更时，通过内网 K8s 中的 self-hosted runner 自动执行 helm upgrade 部署

**Architecture:** 在内网 K8s 部署一个 GitHub Actions self-hosted runner Pod（主动出站连接 GitHub，不需要入站端口）。`build-image-latest.yaml` 增加一个 `runs-on: self-hosted` 的 deploy job，推完镜像后在 runner Pod 里直接执行 `helm upgrade`。

**Tech Stack:** GitHub Actions self-hosted runner, Helm, K8s Deployment

---

## 架构图

```
PR merge to main
    │
    ▼
build-image-latest.yaml 触发
    │
    ├─ Job 1: call-workflow (runs-on: ubuntu-latest)
    │   └─ GitHub 云端: 构建镜像 → push ghcr.io
    │
    └─ Job 2: deploy-internal (runs-on: self-hosted, needs: Job1)
        └─ 内网 runner Pod: helm upgrade matrixhub ...
```

## 文件结构

```
deploy/autoupdate/
├── runner-deployment.yaml     # Runner Pod + RBAC + Secret
├── values-internal.yaml       # 内网 helm values
└── README.md                  # 使用说明
```

---

### Task 1: 创建 self-hosted runner K8s 部署清单

**Files:**
- Create: `deploy/autoupdate/runner-deployment.yaml`

### Task 2: 创建内网 values 覆盖文件

**Files:**
- Create: `deploy/autoupdate/values-internal.yaml`

### Task 3: 修改 build-image-latest.yaml 添加 deploy job

**Files:**
- Modify: `.github/workflows/build-image-latest.yaml`

### Task 4: 部署 runner 到内网集群并验证

### Task 5: 端到端测试
