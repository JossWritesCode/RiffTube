class Subscription < ApplicationRecord
    ## Associations
    has_many :user_subscriptions, dependent: :destroy
    has_many :users, through: :user_subscriptions
  
    ## Validations
    validates :name, presence: true, uniqueness: true
    # description is optional; features is JSONB and flexible
  end
  