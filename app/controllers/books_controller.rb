class BooksController < ApplicationController
  before_action :set_book, only: [:show, :edit, :update, :destroy]
  before_action :get_details, only: [:show]
  before_action :search_books

  # GET /books
  # GET /books.json
  def index
    @books = Book.all.order(id: "DESC")

    respond_to do |format|
      format.html
      format.csv {send_data @books.generate_csv, filename: "book_on_rails-#{Time.zone.now.strftime('%Y%m%d%S')}.csv"}
    end
  end

  # GET /books/1
  # GET /books/1.json
  def show
  end

  # GET /books/new
  def new
    @book = Book.new
  end

  # GET /books/1/edit
  def edit
  end

  # POST /books
  # POST /books.json
  def create
    @book = Book.new(book_params)

    respond_to do |format|
      if @book.save
        # BookMailer.creation_email(@book).deliver_now
        format.html { redirect_to @book, notice: 'Book was successfully created.' }
        format.json { render :show, status: :created, location: @book }
      else
        format.html { render :new }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
    add_title_to_book
  end

  # PATCH/PUT /books/1
  # PATCH/PUT /books/1.json
  def update
    respond_to do |format|
      if @book.update(book_params)
        format.html { redirect_to @book, notice: 'Book was successfully updated.' }
        format.json { render :show, status: :ok, location: @book }
      else
        format.html { render :edit }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
    add_title_to_book
  end

  # DELETE /books/1
  # DELETE /books/1.json
  def destroy
    @book.destroy
    respond_to do |format|
      format.html { redirect_to books_url, notice: '削除されました。' }
      format.json { head :no_content }
    end
  end

  def import
    Book.import(params[:file])
    redirect_to books_url, notice: "本の情報を仕入れました"
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_book
      @book = Book.find(params[:id])
    end

    def get_details
      books = GoogleBooks.search(@book.isbn)
      @book_information = books.first
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def book_params
      params.require(:book).permit(:isbn)
    end

    def search_books
      @q = Book.ransack(params[:q])
      @searched_books = @q.result
    end

    def add_title_to_book
      @book.title = GoogleBooks.search(@book.isbn).first.title
      @book.save
    end
end
