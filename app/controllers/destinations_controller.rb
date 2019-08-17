class DestinationsController < ApplicationController
    before_action :authenticate_user!, :set_user

    def index
        if params.has_key?(:destination) && !params[:destination][:country_id].empty?
            search = params[:destination][:country_id]
            @destinations = @user.destinations.where(country_id: search)
        else
            @destinations = @user.destinations
        end
    end

    def new
        @destination = @user.destinations.build
        @destination.build_country
    end

    def create
        @destination = @user.destinations.new(destination_params)

        if @destination.save
            redirect_to root_path
        else
            render :new
        end
    end

    def show
        @destination = @user.destinations.find_by(id: params[:id])
        respond_to do |format|
            format.html
            format.json{render json: @destination}
        end
    end

    def edit
        set_destination
    end

    def update
        set_destination
        dp = destination_params
        dp[:country_attributes][:id] = ""
        if @destination.update(dp)
            redirect_to destination_path(@destination)
        else
            render :edit
        end
    end

    def destroy
        set_destination
        @destination.delete
        redirect_to root_path
    end

    private

    def set_user
        @user = current_user
    end

    def set_destination
        @destination = @user.destinations.find_by(id: params[:id])
    end

    def destination_params
        params.require(:destination).permit(
            :name,
            :visited,
            :year_of_visit,
            :recommend,
            :revisit,
            :notes,
            :country_id,
            country_attributes: [
                :name,
                :id
            ]
        )
    end
end