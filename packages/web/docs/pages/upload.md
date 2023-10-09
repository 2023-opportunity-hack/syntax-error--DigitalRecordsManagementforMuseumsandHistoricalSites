# Search Page Documentation

## Introduction

This page allows users to upload documents to AWS Kendra, enabling later search functionality.

## Description

The `Search` component is designed to facilitate document uploads to AWS Kendra for future searching. Users can select a file using the file input, and upon submission, the file is uploaded to the AWS Kendra service. The page requires user authentication, and if a user is not signed in, they are redirected to the login page. After successful upload, users can perform searches on the uploaded documents using AWS Kendra's search capabilities. The code uses Next.js, React, and AWS services to achieve this functionality.