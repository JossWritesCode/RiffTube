class CreateMediaFiles < ActiveRecord::Migration[7.0]
  def change
    create_table :media_files, id: :uuid do |t|
      t.uuid :user_id, null: false
      t.column :provider, :storage_provider_enum, default: "gcs"
      t.string :bucket
      t.string :object_path
      t.text :public_url
      t.string :file_type, null: false
      t.float :duration_seconds
      t.bigint :size_bytes
      t.datetime :deleted_at
      t.timestamps
    end

    add_index :media_files, :user_id
  end
end
