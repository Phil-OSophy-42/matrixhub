// Copyright 2026 The MatrixHub Authors.
// SPDX-License-Identifier: Apache-2.0

package common

import (
	"os"
	"time"
)

// GenerateRandomString generates a random string of specified length
func GenerateRandomString(length int) string {
	const charset = "abcdefghijklmnopqrstuvwxyz0123456789"
	seed := time.Now().UnixNano()
	result := make([]byte, length)

	for i := 0; i < length; i++ {
		seed = (seed*1103515245 + 12345) & 0x7fffffff
		result[i] = charset[seed%int64(len(charset))]
	}

	return string(result)
}

// Default timeouts to be used in context.WithTimeout
const (
	PodStartTimeout        = time.Minute * 5
	PodReStartTimeout      = time.Minute * 5
	ExecCommandTimeout     = time.Minute * 5
	EventOccurTimeout      = time.Second * 30
	ResourceDeleteTimeout  = time.Minute * 5
	BatchCreateTimeout     = time.Minute * 5
	InformerSyncStatusTime = time.Second * 30
	ServiceReadyTimeout    = time.Minute * 3
)

// ForcedWaitingTime is a default waiting time between operations
var ForcedWaitingTime = time.Second

// MatrixHub configurations
var (
	MatrixHubNamespace     = "matrixhub"
	MatrixHubServiceName   = "matrixhub"
	MatrixHubPort          = 9527
	MatrixHubDeployment    = "matrixhub"
	MatrixHubConfigMapName = "matrixhub-config"
)

// Environment variables
var (
	E2EClusterName    = os.Getenv("E2E_CLUSTER_NAME")
	E2EKubeConfig     = os.Getenv("KUBECONFIG")
	E2EMatrixHubImage = os.Getenv("E2E_MATRIXHUB_IMAGE")
)

func init() {
	if E2EClusterName == "" {
		E2EClusterName = "matrixhub-e2e"
	}
	if E2EMatrixHubImage == "" {
		E2EMatrixHubImage = "ghcr.io/matrixhub-ai/matrixhub:latest"
	}
}
