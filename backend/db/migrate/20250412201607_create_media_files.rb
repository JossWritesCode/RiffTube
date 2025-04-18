# frozen_string_literal: true

# Migration to create the media_files table with various attributes and indices.
class CreateMediaFiles < ActiveRecord::Migration[7.0]
  def change
    create_media_files_table
    add_media_file_indexes
  end

  private

  def create_media_files_table
    create_table :media_files, id: :uuid do |table|
      add_media_file_columns(table)
      table.timestamps
    end
  end

  def add_media_file_columns(table)
    table.uuid    :user_id,           null: false
    table.column  :provider,          :storage_provider_enum, default: 'gcs'
    table.string  :bucket
    table.string  :object_path
    table.text    :public_url
    table.string  :file_type, null: false
    table.float   :duration_seconds
    table.bigint  :size_bytes
    table.datetime :deleted_at
  end

  def add_media_file_indexes
    add_index :media_files, :user_id
  end
end
