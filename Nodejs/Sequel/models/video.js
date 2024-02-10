module.exports = (sequelize, DataTypes, Model) => {
	class Video extends Model {}
	Video.init(
		{
			title: DataTypes.STRING,
			url: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "video",
		}
	);

	return Video;
};
