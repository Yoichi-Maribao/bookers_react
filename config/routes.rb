Rails.application.routes.draw do
  root to: 'site#index'

  get '/books' => 'site#index'
  get '/books/:id' => 'site#index'
  get '/books/:id/edit' => 'site#index'

  namespace :api do
    namespace :v1 do
      resources :books, only: %i[index create show update edit destroy]
    end
  end
end
