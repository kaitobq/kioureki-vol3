Rails.application.routes.draw do
  namespace "api" do
    resources :users, only: %i[update]
    # resources :users, only: %i[create, update]
    post "users", to: "users#create"
    post "login", to: "authentication#login"
    post "validate", to: "authentication#validate"
  end
end
