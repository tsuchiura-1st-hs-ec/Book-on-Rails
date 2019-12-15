class BookMailer < ApplicationMailer
  def creation_email(book)
    @book = book
    mail(
      subject: '新しい本が入荷しました',
      to: 'user@example.com',
      from: 'bookonrails@example.com'
    )

  end
end
