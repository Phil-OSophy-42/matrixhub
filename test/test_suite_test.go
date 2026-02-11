// Copyright 2024 Authors of matrixhub
// SPDX-License-Identifier: Apache-2.0

package test_test

import (
	"testing"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
)

func TestTest(t *testing.T) {
	RegisterFailHandler(Fail)
	RunSpecs(t, "MatrixHub Test Suite")
}
