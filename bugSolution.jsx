To fix this, you have two main options:

**1. Pass parameters down as props:**
The most straightforward approach is to pass the parameters from the parent route component down to the child component using props.

```jsx
// App.js
<Routes>
  <Route path="/users/:userId/profile" element={<UserProfile/>}>
</Routes>

// UserProfile.js
function UserProfile() {
  const { userId } = useParams();
  return (
    <div>
      <NestedComponent userId={userId} />
    </div>
  );
}

// NestedComponent.js
function NestedComponent({ userId }) {
  // userId is now correctly available
  return <p>User ID: {userId}</p>;
}
```

**2. Use Outlet to access parameters from parent route:**
If you're using nested routes with `Outlet`, you can access the parameters from the parent route within the child route. This is suitable when you have several routes within the same hierarchy accessing the same parameters. 

```jsx
// App.js
<Routes>
  <Route path="/users/:userId" element={<UserRoutes/>}>
    <Route path="profile" element={<UserProfile/>} />
  </Route>
</Routes>

// UserRoutes.js
function UserRoutes() {
  const {userId} = useParams();
  return <Outlet context={{userId}} />
}

// UserProfile.js
function UserProfile(){
  const {userId} = useOutletContext();
  return <p>User ID: {userId}</p>
}
```

Choose the method that best suits your routing structure. Passing parameters via props offers better clarity in simple cases, while using `Outlet` might be cleaner in more complex hierarchies. 