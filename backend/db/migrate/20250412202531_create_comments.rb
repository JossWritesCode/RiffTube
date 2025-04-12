class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments, id: :uuid do |t|
      t.uuid :user_id, null: false
      t.column :commentable_type, :commentable_type_enum, null: false
      t.uuid :commentable_id, null: false
      t.text :content, null: false
      t.datetime :deleted_at

      t.timestamps
    end

    add_index :comments, [:commentable_type, :commentable_id]
  end
end
