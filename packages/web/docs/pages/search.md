# Search Page Documentation

## Introduction

The Search page is a component of the application that allows users to search for important information. It utilizes Next.js and NextAuth for authentication and routing. Users can input their search queries and perform searches in the repository of information. 

## Description

The page includes the following key features:

- **Authentication**: Users must be authenticated to access the page, and they can sign out using the "Sign Out" button.

- **Search Input**: Users can input their search queries into the search input field, and the input is stored in the `searchText` state.

If the user is not authenticated, they are redirected to the Login page.