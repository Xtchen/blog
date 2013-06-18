class PostsController < ApplicationController

	before_filter :admin_validate, :only => [:new, :create, :edit, :update, :destroy]

	def index
		@intro = Intro.first
		@links = Link.all
		@posts = Post.paginate(:page => params[:page], :per_page => 10, :order => 'updated_at DESC')
		@posts_years = Post.all.group_by {|post| post.created_at.beginning_of_year}
	end

	def show
		@post = Post.find params[:id]
		@comment = Comment.new
	end

	def search
		@keyword = params[:keyword]
		@posts = Post.paginate(:conditions => ["content LIKE ? or title LIKE ?", "%#{@keyword}%", "%#{@keyword}%"], :page => params[:page], :per_page => 10)
	end

	def showByMonth
		@month = Date.parse params[:month]
		sql = "select *
		from posts
		where created_at >= '#{@month.beginning_of_month}' and  
		created_at < '#{@month.next_month.beginning_of_month}'
		"
		#@posts = Post.find_by_sql(sql)
		@posts = Post.paginate_by_sql(sql, :page => params[:page], :per_page => 10)
		#@posts = Post.all.select { |post| post.created_at.beginning_of_month == params[:month]}
	end

	def showByTag
		@tag = Tag.find params[:id.to_s]
		@posts = @tag.posts.paginate(:page => params[:page], :per_page => 10, :order => 'updated_at DESC')
	end

	def edit
		@post = Post.find params[:id]
		@tags = @post.tags
	end

	def update
		post = Post.find params[:post][:id]
		if Post.update(post.id, :title => params[:post][:title], :content => params[:post][:content])
			tags = params[:post][:tags].split(/,/)
			post.tags.each do |t|
				if tags.include? t.name
					tags.delete t.name
				else
					post.tags.delete t
					if t.posts.empty?
						Tag.delete t.id
					end
				end
			end

			tags.each do |t|
				tag = Tag.find_by_name t
				unless tag
					tag = Tag.new(:name => t)
					tag.save
				end
				post.tags<<tag
			end

			flash[:success] = 'Successfully saved!'
			redirect_to post_path(post)
		else
			render 'edit'
		end
	end

	def new
		@tags = Tag.all
	end

	def create
		post = Post.new
		post.title = params[:post][:title]
		post.content = params[:post][:content]
		tags = params[:post][:tags].split(/,/)
		
		tags.each do |t|
			if !t.blank?
				tag = Tag.find_by_name t
				unless tag
					tag = Tag.new(:name => t)
					tag.save
				end
				post.tags<<tag
			end
		end
		
		if post.save
			flash[:success] = 'Successfully posted!'
			redirect_to post_path(post)
		else
			render 'new'
		end
	end

	def destroy
		id = params[:id]
		tags = Post.find(id).tags
		if Post.delete(id)
			tags.each do |t|
				if t.posts.empty?
					Tag.delete t.id
				end
			end
			flash[:success] = 'Successfully deleted!'
			redirect_to posts_path
		else
			render 'destroy'
		end
	end
end
