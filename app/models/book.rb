class Book < ApplicationRecord
  validates :isbn, uniqueness: true, length: { is: 13 }, presence: true

  def self.csv_attributes
    ["isbn", "title", "created_at", "updated_at"]
  end

  def self.generate_csv
    CSV.generate(headers: true) do |csv|
      csv << csv_attributes
      all.each do |book|
        csv << csv_attributes.map { |attr| book.send(attr) }
      end
    end
  end

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      book = find_by(isbn: row["isbn"]) || new
      book.attributes = row.to_hash.slice(*csv_attributes)
      book.save!
    end
  end
end
