# frozen_string_literal: true

# This module provides helper methods for integration tests,
# including JSON response parsing and user login functionality.
module IntegrationHelpers
  #
  # Parse JSON response into a Ruby Hash.
  # Returns nil if the response body is empty.
  #
  def json_body
    JSON.parse(response.body) if response.body.present?
  end

  def log_in(user, password = 'secret123')
    post '/api/v1/login',
         params: { email: user.email, password: password }
  end
end
