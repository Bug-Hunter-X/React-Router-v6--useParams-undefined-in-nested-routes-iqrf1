In React Router Dom v6, a common issue arises when using the `useParams` hook within a component nested deeply inside several route components.  The problem manifests as the `params` object being undefined or empty, even when the URL clearly matches the expected route pattern.  This happens because the `useParams` hook only has access to the parameters from the *closest* route match in the tree.  If the component containing `useParams` isn't directly under the route that defines the parameter, it will not receive the values.

Example:

```jsx
// App.js
<Routes>
  <Route path="/users/:userId/profile" element={<UserProfile/>}>
</Routes>

// UserProfile.js
function UserProfile() {
  const { userId } = useParams();
  // userId will be undefined
}
```

In this scenario, placing `useParams` inside a nested component within `UserProfile` would not correctly retrieve `userId`. 