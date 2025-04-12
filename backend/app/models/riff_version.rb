class RiffVersion < ApplicationRecord
    belongs_to :riff
    belongs_to :media_file, optional: true
    belongs_to :changed_by_user, class_name: "User", foreign_key: "changed_by", optional: true
  
    enum audio_source: {
      recorded: "recorded",
      synth: "synth"
    }
  end
  