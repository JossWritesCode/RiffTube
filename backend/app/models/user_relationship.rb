# frozen_string_literal: true

# Represents a relationship between two users, such as a block or follow.
class UserRelationship < ApplicationRecord
  ## Associations
  belongs_to :from_user, class_name: 'User'
  belongs_to :to_user,   class_name: 'User'

  ## Validations
  validates :from_user_id, :to_user_id, :relationship_type, presence: true

  # Prevent duplicate relationships of the same type between two users
  validates :to_user_id,
            uniqueness: { scope: %i[from_user_id relationship_type],
                          message: 'relationship already exists' }
end
