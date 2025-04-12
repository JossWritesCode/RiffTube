class CreateProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :projects, id: :uuid do |t|
      t.uuid   :owner_id, null: false
      t.string :title, null: false
      t.string :video_host, null: false
      t.string :video_id
      t.text   :video_url
      t.string :visibility, default: "private"
      t.string :shareable_link
      t.uuid   :forked_from_project_id
      t.datetime :deleted_at

      t.timestamps
    end

    add_index :projects, :shareable_link, unique: true
    add_foreign_key :projects, :users, column: :owner_id
    add_foreign_key :projects, :projects, column: :forked_from_project_id
  end
end
