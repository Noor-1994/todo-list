# Style Documentation

## Overview

This project uses a clean, responsive, and consistent visual design to make the Todo List application easy to use across desktop, tablet, and mobile devices.

The styling focuses on readability, clear visual hierarchy, consistent spacing, accessible interactions, and simple feedback for user actions.

## Styling Approach

The application uses traditional CSS with shared global styles.

The main styling files are:

- `src/App.css`
- `src/index.css`

Shared CSS classes are used to keep buttons, forms, cards, navigation, and page layouts visually consistent.

## Color Scheme

The application uses a light background with neutral surfaces and blue accent colors.

The main design goals are:

- Clear contrast between background and content
- Blue accents for primary actions and focus states
- Neutral colors for supporting text and borders
- Red accents for destructive actions such as deleting a todo
- White cards and surfaces to separate content from the page background

## Typography

The application uses a modern system-based font stack.

Typography is organized using different heading sizes and supporting text styles to create a clear hierarchy.

Headings are used to identify major sections, while descriptive text provides supporting information without competing with the main content.

## Layout and Spacing

Page layouts use centered containers and consistent spacing.

Cards and sections use padding, margins, borders, and rounded corners to visually separate related content.

The Todo List page uses structured sections for:

- Filters
- Sorting
- Search
- Adding todos
- Todo items
- Error feedback

The About, Profile, Login, and 404 pages use consistent centered layouts and card-based content areas.

## Buttons

Buttons use consistent styling throughout the application.

Different button styles communicate different actions:

- Primary buttons for main actions
- Secondary buttons for supporting actions
- Danger buttons for destructive actions such as deleting todos

Button states include:

- Hover
- Focus
- Disabled

## Forms and Inputs

Form inputs use clear labels and consistent spacing.

Input focus states provide a visible outline to improve keyboard accessibility.

Todo titles are validated before submission and are limited to a maximum length of 100 characters.

## Todo Items

Todo items are presented in a consistent layout containing:

- Checkbox
- Todo title
- Edit action
- Delete action

Completed todos are visually distinguished from active todos.

The edit mode keeps the input and related actions grouped together so users can easily update or cancel changes.

## Navigation

The navigation provides consistent links across the application.

Active navigation links visually communicate the user's current location.

Navigation also changes based on authentication status so protected links are shown only when appropriate.

## Responsive Design

The application uses responsive CSS rules to adapt to different screen sizes.

The design was tested with Chrome DevTools on:

- Desktop
- Mobile portrait
- Mobile landscape
- Tablet

The responsive layout was checked to make sure:

- Content remains inside the viewport
- Horizontal scrolling is avoided
- Buttons remain usable
- Text remains readable
- Forms adapt to smaller screens
- Todo actions remain accessible

## Accessibility

Accessibility was considered throughout the design.

The application includes:

- Form labels associated with their inputs
- Visible keyboard focus states
- Accessible navigation labels
- Appropriate button types
- Alert and status roles for feedback
- Touch-friendly interactive elements
- Sufficient spacing between interactive controls

## Feedback and Error States

The application provides visual feedback for important user actions.

Examples include:

- Loading states
- API error messages
- Empty todo states
- Disabled buttons when input is invalid
- Confirmation dialog before deleting a todo

Error messages are written for users rather than exposing technical implementation details.

## Design Decisions

The design uses simple visual patterns instead of unnecessary decoration.

The goal was to keep the Todo List easy to understand while still presenting the project as a polished portfolio application.

Consistent cards, spacing, button styles, colors, and typography help create a unified experience across all pages.

## Future Design Improvements

Possible future improvements include:

- Additional animations and micro-interactions
- Dark mode
- More advanced visual feedback
- Additional customization options