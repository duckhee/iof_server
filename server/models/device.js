'use strict';

module.exports = function(sequelize, DataTypes) {
    var device = sequelize.define('device', {
        device_name: {
            type: DataTypes.STRING
        },
        /*
        userId:{
                type: DataTypes.INTEGER,
                references: {
                    model: 'user',
                    key: 'id'
                },
                allowNull: false,
                onDelete: 'CASCADE'
        },
        */
        device_apikey: {
            type: DataTypes.STRING,
            references: {
                model: 'user',
                key: 'apikey'
            },
            allowNull: false,
            onDelete: 'CASCADE',
        },
        device_num: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        device_serial: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,

        },
        device_address: {
            type: DataTypes.STRING
        },
        /*
        device_type: {
            type: DataTypes.STRING,

        },
        device_type: {
            type: DataTypes.ENUM,
            values: ['iof', 'radon'],
            defaultValue: 'iof'
        }
        */
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                models.device.belongsTo(models.user, {
                    foreignKeyConstraint: true,
                    foreignKey: 'device_apikey',
                    allowNull: false,
                    onDelete: 'CASCADE',
                });

                models.device.hasMany(models.device_network, { //hosOne??
                    foreignKey: 'deviceId', //has사용시는 상대방 ?? 자기자신도 가능 ?
                    onDelete: 'CASCADE',
                    allowNull: false,
                    foreignKeyConstraint: true
                });

                models.device.hasMany(models.camera_image, {
                    foreignKey: 'deviceId', //has사용시는 상대방 ?? 자기자신도 가능 ?
                    onDelete: 'CASCADE',
                    allowNull: false,
                    foreignKeyConstraint: true
                });
                models.device.hasMany(models.camera_image, {
                    foreignKey: 'si_serial', //has사용시는 상대방 ?? 자기자신도 가능 ?
                    onDelete: 'CASCADE',
                    allowNull: false,
                    foreignKeyConstraint: true
                });
            }
        }
    });

    device.associate = function(models) {
        device.belongsTo(models.user, {
            foreignKeyConstraint: true,
            foreignKey: 'device_apikey',
            allowNull: false,
            onDelete: 'CASCADE',
        });

        device.hasMany(models.device_value, {
            foreignKey: 'deviceId', //has사용시는 상대방 ?? 자기자신도 가능 ?
            onDelete: 'CASCADE',
            allowNull: false,
            foreignKeyConstraint: true
        });


        device.hasOne(models.device_network, { //hosOne??
            foreignKey: 'deviceId', //has사용시는 상대방 ?? 자기자신도 가능 ?
            onDelete: 'CASCADE',
            allowNull: false,
            foreignKeyConstraint: true
        });

        //why error ??/
        device.hasMany(models.camera_image, {
            foreignKey: 'deviceId', //has사용시는 상대방 ?? 자기자신도 가능 ?
            onDelete: 'CASCADE',
            allowNull: false,
            foreignKeyConstraint: true
        });

        device.hasMany(models.camera_image, {
            foreignKey: 'si_serial', //has사용시는 상대방 ?? 자기자신도 가능 ?
            onDelete: 'CASCADE',
            allowNull: false,
            foreignKeyConstraint: true
        });
    }

    /*
        //before hook
        device.hook("afterCreate", function(device) {
            models.device_network.create({
                sn_type: '',
                sn_address: '',
                sn_serial: device.device_serial,
                deviceId: device.id,
                sn_apikey: device.device_apikey
            }).then((result) => {
                console.log('created model device network !!');
            }).catch((err) => {
                console.log('before create device failed error :::: ', err);
            });

        });
    */

    return device;
};