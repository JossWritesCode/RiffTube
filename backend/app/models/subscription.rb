# frozen_string_literal: true

# The Subscription class represents a subscription plan in the system.
# It includes associations with users and user subscriptions, and validates
# the presence and uniqueness of the subscription name.
class Subscription < ApplicationRecord
  ## Associations
  has_many :user_subscriptions, dependent: :destroy
  has_many :users, through: :user_subscriptions

  ## Validations
  validates :name, presence: true, uniqueness: true
  # description is optional; features is JSONB and flexible
end
