class CreateMemos < ActiveRecord::Migration[6.0]
  def change
    create_table :memos do |t|
      t.references :memoable, polymorphic: true, null: false
      t.string :body

      t.timestamps
    end
  end
end
