class Comment < ApplicationRecord
  ## Associations
  belongs_to :user
  belongs_to :commentable, polymorphic: true   # Project or Riff

  ## Validations
  validates :user_id,  presence: true
  validates :content,  presence: true


end
