# frozen_string_literal: true

# RiffReaction represents a user's reaction to a specific riff.
# It ensures that each user can only react once per riff and validates
# the presence and type of the reaction.
class RiffReaction < ApplicationRecord
  ## Associations
  belongs_to :riff
  belongs_to :user

  ## Validations
  validates :riff_id, :user_id, :reaction_type, presence: true

  # Prevent the same user from reacting to the same riff twice
  validates :user_id,
            uniqueness: { scope: :riff_id,
                          message: 'has already reacted to this riff' }

  # Optional: constrain reaction_type to an allowed set
  REACTIONS = %w[like dislike laugh wow sad angry].freeze
  validates :reaction_type, inclusion: { in: REACTIONS }
end
