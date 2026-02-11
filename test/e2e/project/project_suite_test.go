// Copyright 2024 Authors of matrixhub
// SPDX-License-Identifier: Apache-2.0

package project_test

import (
	"context"
	"os"
	"testing"
	"time"

	mhe2e "github.com/matrixhub-ai/matrixhub/test/e2e"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
)

func TestProject(t *testing.T) {
	RegisterFailHandler(Fail)
	RunSpecs(t, "Project Suite")
}

var (
	apiClient *mhe2e.MatrixHubClient
	ctx       context.Context
	cancel    context.CancelFunc
)

var _ = BeforeSuite(func() {
	defer GinkgoRecover()

	baseURL := os.Getenv("APISERVER_URL")
	if baseURL == "" {
		baseURL = mhe2e.GetBaseURL()
	}

	ctx, cancel = context.WithTimeout(context.Background(), 10*time.Minute)

	GinkgoWriter.Printf("Waiting for API server at %s...\n", baseURL)
	err := mhe2e.WaitForServiceReady(ctx, baseURL, mhe2e.DefaultServiceReadyTimeout)
	Expect(err).NotTo(HaveOccurred(), "API server should be ready")

	apiClient = mhe2e.NewMatrixHubClient(baseURL)
})

var _ = AfterSuite(func() {
	if cancel != nil {
		cancel()
	}
})
