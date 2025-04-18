# frozen_string_literal: true

# The Comment model represents a comment made by a user.
# It can belong to any commentable entity, such as a Project or a Riff.
class Comment < ApplicationRecord
  ## Associations
  belongs_to :user
  belongs_to :commentable, polymorphic: true # Project or Riff

  ## Validations
  validates :user_id,  presence: true
  validates :content,  presence: true
end
