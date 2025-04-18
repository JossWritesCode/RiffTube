# frozen_string_literal: true

# ApplicationController is the base controller for all API controllers.
# It provides common functionality such as user authentication
class ApplicationController < ActionController::API
  # Stub for now — this will eventually check if a user is logged in
  def authenticate_user!
    # TODO: Implement session-based user authentication
  end
end
