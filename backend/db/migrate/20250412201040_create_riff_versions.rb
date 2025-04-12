class CreateRiffVersions < ActiveRecord::Migration[7.0]
  def change
    create_table :riff_versions, id: :uuid do |t|
      t.uuid :riff_id, null: false
      t.integer :version_number, null: false
      t.text :text_content
      t.uuid :media_file_id
      t.column :audio_source, :audio_source_enum
      t.jsonb :tts_config
      t.jsonb :styling
      t.uuid :changed_by
      t.timestamp :changed_at, default: -> { "CURRENT_TIMESTAMP" }

      t.timestamps
    end

    add_index :riff_versions, :riff_id
    add_index :riff_versions, [:riff_id, :version_number], unique: true
  end
end
