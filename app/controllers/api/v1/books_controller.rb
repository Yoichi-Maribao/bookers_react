class Api::V1::BooksController < ApplicationController
  def index
    books = Book.all
    render json: books
  end

  def create
    book = Book.new(book_params)
    if book.save
      render json: book
    else
      render json: book.errors, status: 422
    end
  end

  def show
    book = Book.find(params[:id])
    render json: book
  end

  def edit
    book = Book.find(params[:id])
    render json: book
  end

  def update
    book = Book.find(params[:id])
    if book.update(book_params)
      render json: book
    else
      render json: book.errors, status: 422
    end
  end

  def destroy
    book = Book.find(params[:id])
    if book.destroy
      head :no_content
    else
      render json: { error: "Failed to destroy"}, status: 422
    end
  end

  private
  def book_params
    params.require(:book).permit(:title, :body)
  end


end
