class ChangeDataIsbnToBook < ActiveRecord::Migration[6.0]
  def change
    change_column :books, :isbn, :bigint
  end
end
