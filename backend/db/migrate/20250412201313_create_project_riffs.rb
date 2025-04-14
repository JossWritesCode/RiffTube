class CreateProjectRiffs < ActiveRecord::Migration[7.0]
  def change
    create_table :project_riffs, id: :uuid do |t|
      t.references :project, null: false, type: :uuid, foreign_key: true
      t.references :riff, null: false, type: :uuid, foreign_key: true
      t.float :start_time
      t.float :end_time
      t.jsonb :optional_settings

      t.timestamps
    end

    add_index :project_riffs, [:project_id, :riff_id], unique: true
  end
end
