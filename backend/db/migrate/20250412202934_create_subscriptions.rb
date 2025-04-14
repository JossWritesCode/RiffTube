class CreateSubscriptions < ActiveRecord::Migration[7.0]
  def change
    create_table :subscriptions, id: :uuid do |t|
      t.string :name, null: false
      t.text :description
      t.jsonb :features

      t.timestamps
    end

    add_index :subscriptions, :name, unique: true
  end
end
