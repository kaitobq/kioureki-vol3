Rails.application.routes.draw do
  namespace :api do
    get 'invitations/create'
  end
  namespace "api" do
    resources :users, only: %i[update]

    post "users", to: "users#create"
    post "login", to: "authentication#login"
    post "validate", to: "authentication#validate"

    resources :organizations, only: [:index, :create] do
      resources :invitations, only: [:create]
    end
    resources :memberships, only: [:create]

    post 'invitations/accept', to: 'memberships#create'

    resources :medical_records, only: [:index, :show, :create, :update, :destroy]
  end
end
