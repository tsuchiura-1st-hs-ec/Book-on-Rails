class Book < ApplicationRecord
  validates :isbn, uniqueness: true, length: { is: 13 }
end
