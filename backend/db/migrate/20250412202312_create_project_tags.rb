class CreateProjectTags < ActiveRecord::Migration[7.0]
  def change
    create_table :project_tags, id: :uuid do |t|
      t.uuid :project_id, null: false
      t.uuid :tag_id, null: false

      t.timestamps
    end

    add_index :project_tags, [:project_id, :tag_id], unique: true
    add_index :project_tags, :project_id
    add_index :project_tags, :tag_id
  end
end
