# frozen_string_literal: true

# UserSubscription represents the association between a user and a subscription.
# It ensures that each user can have a unique subscription and validates the
# presence of required fields and the logical order of dates.
class UserSubscription < ApplicationRecord
  ## Associations
  belongs_to :user
  belongs_to :subscription

  ## Validations
  validates :user_id, :subscription_id, presence: true

  # One active record per user–subscription pair
  validates :subscription_id,
            uniqueness: { scope: :user_id,
                          message: 'is already attached to this user' }

  # Sanity‑check for dates (started_at has default NOW)
  validates :ends_at, comparison: { greater_than: :started_at },
                      allow_nil: true
end
