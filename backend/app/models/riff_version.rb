class RiffVersion < ApplicationRecord
  ## Associations
  belongs_to :riff
  belongs_to :media_file, optional: true
  belongs_to :changed_by_user,
             class_name: "User",
             foreign_key: "changed_by",
             inverse_of: :riff_versions

  ## Enum
  enum audio_source: {
    recorded: "recorded",
    synth:    "synth"
  }

  ## Validations
  validates :version_number, presence: true,
                             uniqueness: { scope: :riff_id }
end
