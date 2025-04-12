class UserPreference < ApplicationRecord
    ## Associations
    belongs_to :user
  
    ## Validations
    validates :user_id, presence: true, uniqueness: true
    # `autosave` has a default (true); no presence validation needed.
    # `settings` is JSONB and optional.
  end
  