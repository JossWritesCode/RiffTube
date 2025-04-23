# frozen_string_literal: true

require 'test_helper'

# We define an inline controller to exercise the shared bits in ApplicationController
class DummyController < ApplicationController
  # Use ResponseRenderable to render success
  def open
    render json: { message: 'it works' }, status: :ok
  end

  # Protect this endpoint with the Authenticatable concern
  before_action :authenticate_user!, only: :secret
  def secret
    render json: { message: 'top secret' }, status: :ok
  end
end

# Test suite for the ApplicationController, including tests for shared functionality
# such as ResponseRenderable and Authenticatable concerns.
class ApplicationControllerTest < ActionController::TestCase
  tests DummyController

  def self.routes
    @routes ||= ActionDispatch::Routing::RouteSet.new.tap do |r|
      r.draw do
        get 'open',   to: 'dummy#open'
        get 'secret', to: 'dummy#secret'
      end
    end
  end

  setup do
    @routes = self.class.routes
  end

  # ------------------------------------------------------------
  # ResponseRenderable smoke-tests
  # ------------------------------------------------------------
  test 'open action renders JSON and 200 by default' do
    get :open, as: :json
    assert_response :ok
    assert_equal 'it works', JSON.parse(response.body)['message']
  end

  # ------------------------------------------------------------
  # Authenticatable smoke-tests
  # ------------------------------------------------------------
  test 'secret action fails when no user id in session' do
    get :secret, as: :json
    assert_response :unauthorized
  end

  test 'secret action succeeds when session[:user_id] is set' do
    user = create(:user)
    @request.session[:user_id] = user.id # ← session-based login stub

    get :secret, as: :json
    assert_response :ok
    assert_equal 'top secret', JSON.parse(response.body)['message']
  end
end
