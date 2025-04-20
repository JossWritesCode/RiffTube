# frozen_string_literal: true

# ApplicationController is the base controller for all API controllers.
# It provides common functionality such as user authentication
class ApplicationController < ActionController::API
  include ActionController::Helpers
  include Authenticatable
  include ResponseRenderable
end
