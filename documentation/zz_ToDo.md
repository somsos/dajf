# ToDo

> = actual
X = finished

- [X] Create Dashboards
  - [X] Admin dashboard
  - [X] Stocker dashboard
  - [X] Cashier dashboard
  - [X] Add nav that show only the allowed paths for the user
  - [X] Add just screen of list users
  - [X] Add just screen of list products
  - [X] Add just screen of list sells
- [X] Add NgRx
  - [X] Design UI state for auth
  - [X] implement ngrx/state for auth
  - [X] Add routing using router-store (the navigation must change when the state go back in the devTools)
- [X] Implement router security by roles
- [>] Connect login to backend
  - [X] Sync request and response
  - [X] Show login server error
- [X] Implement factory for api consumption by web-api or mock
  - [X] Implement api consumers for testing
  - [X] Implement mock api consumers
- [>] Crud products
  - [X] List
    - [X] Controls for page navigation
  - [X] Add
    - [X] show saving in progress spinner
    - [X] add images
  - [X] Details
    - [X] Show images
  - [X] Delete
  - [X] Update
  - [>] Connect to server
    - [X] List
    - [X] Add
    - [X] Details
      - [X] Show images
    - [X] Delete
    - [X] Update
  - [ ] Bugs
    - [X] Show login in progress spinner
    - [ ] General error handeling using for reactive side
    - [X] handle token expired
    - [>] Fix the order of images (newest fist) in all products forms
  - [ ] Documentation
    - [ ] Explain how error are managed (http-interceptor, components-global-error-handler, state-filter-actions-by-string-match|or-dispatch-action-error)
    - [ ] Explain how loadings are managed
- [ ] Crud user
  - [ ] List users
  - [ ] Add user
  - [ ] Delete user
  - [ ] Update user
- [X] Product images
  - [X] Add image (main image is the last added)
  - [X] Remove image
  - [X] Images order
- [ ] Sells
  - [ ] ????

```ts
export declare function provideStore<T, V extends Action = Action>(
  reducers?: ActionReducerMap<T, V> | InjectionToken<ActionReducerMap<T, V>>,
  config?: RootStoreConfig<T, V>): EnvironmentProviders;
```
