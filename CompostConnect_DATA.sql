USE [CompostConnect]
GO
INSERT [CompostConnect].[Sensors] ([Id], [SensorName], [Description], [IsActive], [CreatedBy], [ModifiedBy], [CreatedAt], [UpdatedAt], [Deleted]) VALUES (N'1', N'Sensor-1', N'Sensor-1', 1, NULL, NULL, CAST(N'2016-03-17T13:50:17.1344563+00:00' AS DateTimeOffset), CAST(N'2016-03-17T13:50:17.1984563+00:00' AS DateTimeOffset), 0)
GO
INSERT [CompostConnect].[Sensors] ([Id], [SensorName], [Description], [IsActive], [CreatedBy], [ModifiedBy], [CreatedAt], [UpdatedAt], [Deleted]) VALUES (N'2', N'Sensor-2', N'Sensor-2', 1, NULL, NULL, CAST(N'2016-03-17T13:50:33.8454563+00:00' AS DateTimeOffset), CAST(N'2016-03-17T13:50:33.8454563+00:00' AS DateTimeOffset), 0)
GO
INSERT [CompostConnect].[Sensors] ([Id], [SensorName], [Description], [IsActive], [CreatedBy], [ModifiedBy], [CreatedAt], [UpdatedAt], [Deleted]) VALUES (N'3', N'Sensor-3', N'Sensor-3', 1, NULL, NULL, CAST(N'2016-03-17T13:51:17.7034563+00:00' AS DateTimeOffset), CAST(N'2016-03-17T13:51:22.8804563+00:00' AS DateTimeOffset), 0)
GO
INSERT [CompostConnect].[Sensors] ([Id], [SensorName], [Description], [IsActive], [CreatedBy], [ModifiedBy], [CreatedAt], [UpdatedAt], [Deleted]) VALUES (N'4', N'Sensor-4', N'Sensor-4', 1, NULL, NULL, CAST(N'2016-03-17T13:51:17.7034563+00:00' AS DateTimeOffset), CAST(N'2016-03-17T14:22:49.3074427+00:00' AS DateTimeOffset), 0)
GO
INSERT [CompostConnect].[Sensors] ([Id], [SensorName], [Description], [IsActive], [CreatedBy], [ModifiedBy], [CreatedAt], [UpdatedAt], [Deleted]) VALUES (N'5', N'Sensor-5', N'Sensor-5', 1, NULL, NULL, CAST(N'2016-03-17T13:51:17.7034563+00:00' AS DateTimeOffset), CAST(N'2016-03-17T14:22:56.9734427+00:00' AS DateTimeOffset), 0)
GO
INSERT [CompostConnect].[Sensors] ([Id], [SensorName], [Description], [IsActive], [CreatedBy], [ModifiedBy], [CreatedAt], [UpdatedAt], [Deleted]) VALUES (N'6', N'Sensor-6', N'Sensor-6', 1, NULL, NULL, CAST(N'2016-03-17T13:51:17.7034563+00:00' AS DateTimeOffset), CAST(N'2016-03-17T14:23:04.2114427+00:00' AS DateTimeOffset), 0)
GO
INSERT [CompostConnect].[Sources] ([Id], [Address], [ContactName], [ContactNum], [AltContactNum1], [AltContactNum2], [SourceType], [Longitude], [Latitude], [CreatedBy], [ModifiedBy], [sensorId], [CreatedAt], [UpdatedAt], [Deleted]) VALUES (N'1', N'BLR-AREA1', N'House-Owner-1', N'123456789', N'987654321', NULL, N'Hotel', N'12.973592', N'77.603055', NULL, NULL, NULL, CAST(N'2016-03-17T14:06:48.3491009+00:00' AS DateTimeOffset), CAST(N'2016-03-17T14:08:04.7844427+00:00' AS DateTimeOffset), 0)
GO
INSERT [CompostConnect].[Sources] ([Id], [Address], [ContactName], [ContactNum], [AltContactNum1], [AltContactNum2], [SourceType], [Longitude], [Latitude], [CreatedBy], [ModifiedBy], [sensorId], [CreatedAt], [UpdatedAt], [Deleted]) VALUES (N'2', N'BLR-AREA2', N'House-Owner-2', N'123456789', N'987654321', NULL, N'House', N'12.970529', N' 77.606344', NULL, NULL, NULL, CAST(N'2016-03-17T14:06:48.3491009+00:00' AS DateTimeOffset), CAST(N'2016-03-17T14:12:38.2554427+00:00' AS DateTimeOffset), 0)
GO
INSERT [CompostConnect].[Sources] ([Id], [Address], [ContactName], [ContactNum], [AltContactNum1], [AltContactNum2], [SourceType], [Longitude], [Latitude], [CreatedBy], [ModifiedBy], [sensorId], [CreatedAt], [UpdatedAt], [Deleted]) VALUES (N'3', N'BLR-AREA3', N'House-Owner-3', N'123456789', N'987654321', NULL, N'Apartment', N'12.962551', N'77.596162', NULL, NULL, NULL, CAST(N'2016-03-17T14:06:48.3491009+00:00' AS DateTimeOffset), CAST(N'2016-03-17T14:12:41.2404427+00:00' AS DateTimeOffset), 0)
GO
INSERT [CompostConnect].[Sources] ([Id], [Address], [ContactName], [ContactNum], [AltContactNum1], [AltContactNum2], [SourceType], [Longitude], [Latitude], [CreatedBy], [ModifiedBy], [sensorId], [CreatedAt], [UpdatedAt], [Deleted]) VALUES (N'4', N'BLR-AREA4', N'Market-Owner-4', N'123456789', N'987654321', NULL, N'Market', N'12.962345', N'77.596452', NULL, NULL, NULL, CAST(N'2016-03-17T14:06:48.3491009+00:00' AS DateTimeOffset), CAST(N'2016-03-17T14:12:44.5744427+00:00' AS DateTimeOffset), 0)
GO
INSERT [CompostConnect].[Users] ([Id], [FirstName], [LastName], [Email], [ContactNo], [UserType], [Password], [IsActive], [CreatedBy], [ModifiedBy], [CreatedAt], [UpdatedAt], [Deleted]) VALUES (N'1', N'User', N'First', N'user.first@email.com', N'1235345645', N'Farmer', N'password', 1, NULL, NULL, CAST(N'2016-03-17T14:19:34.5434427+00:00' AS DateTimeOffset), CAST(N'2016-03-17T14:19:34.5534427+00:00' AS DateTimeOffset), 0)
GO
INSERT [CompostConnect].[Users] ([Id], [FirstName], [LastName], [Email], [ContactNo], [UserType], [Password], [IsActive], [CreatedBy], [ModifiedBy], [CreatedAt], [UpdatedAt], [Deleted]) VALUES (N'2', N'User', N'Two', N'user.two@email.com', N'1235345645', N'Farmer', N'password', 1, NULL, NULL, CAST(N'2016-03-17T14:19:34.5434427+00:00' AS DateTimeOffset), CAST(N'2016-03-17T14:20:09.9014427+00:00' AS DateTimeOffset), 0)
GO
INSERT [CompostConnect].[Users] ([Id], [FirstName], [LastName], [Email], [ContactNo], [UserType], [Password], [IsActive], [CreatedBy], [ModifiedBy], [CreatedAt], [UpdatedAt], [Deleted]) VALUES (N'3', N'Corporate', N'First', N'corporate.user@email.com', N'1235345645', N'Corporate', N'password', 1, NULL, NULL, CAST(N'2016-03-17T14:19:34.5434427+00:00' AS DateTimeOffset), CAST(N'2016-03-17T14:21:30.9114427+00:00' AS DateTimeOffset), 0)
GO
INSERT [CompostConnect].[Users] ([Id], [FirstName], [LastName], [Email], [ContactNo], [UserType], [Password], [IsActive], [CreatedBy], [ModifiedBy], [CreatedAt], [UpdatedAt], [Deleted]) VALUES (N'4', N'Corporate', N'Second', N'corporate.second@email.com', N'1235345645', N'Corporate', N'password', 1, NULL, NULL, CAST(N'2016-03-17T14:19:34.5434427+00:00' AS DateTimeOffset), CAST(N'2016-03-17T14:21:53.7764427+00:00' AS DateTimeOffset), 0)
GO
INSERT [CompostConnect].[ConsumerPicks] ([Id], [SourceId], [UserId], [Date], [PickStatus], [CreatedBy], [ModifiedBy], [CreatedAt], [UpdatedAt], [Deleted]) VALUES (N'1', N'1', N'1', CAST(N'2016-03-17 00:00:00.000' AS DateTime), NULL, NULL, NULL, CAST(N'2016-03-17T14:27:26.8184427+00:00' AS DateTimeOffset), CAST(N'2016-03-17T14:27:28.8874427+00:00' AS DateTimeOffset), 0)
GO
INSERT [CompostConnect].[ConsumerPicks] ([Id], [SourceId], [UserId], [Date], [PickStatus], [CreatedBy], [ModifiedBy], [CreatedAt], [UpdatedAt], [Deleted]) VALUES (N'2', N'2', N'2', CAST(N'2016-03-17 00:00:00.000' AS DateTime), NULL, NULL, NULL, CAST(N'2016-03-17T14:27:26.8184427+00:00' AS DateTimeOffset), CAST(N'2016-03-17T14:28:01.3214427+00:00' AS DateTimeOffset), 0)
GO
INSERT [CompostConnect].[ConsumerPicks] ([Id], [SourceId], [UserId], [Date], [PickStatus], [CreatedBy], [ModifiedBy], [CreatedAt], [UpdatedAt], [Deleted]) VALUES (N'3', N'3', N'3', CAST(N'2016-03-17 00:00:00.000' AS DateTime), NULL, NULL, NULL, CAST(N'2016-03-17T14:27:26.8184427+00:00' AS DateTimeOffset), CAST(N'2016-03-17T14:28:04.0104427+00:00' AS DateTimeOffset), 0)
GO
INSERT [CompostConnect].[ConsumerPicks] ([Id], [SourceId], [UserId], [Date], [PickStatus], [CreatedBy], [ModifiedBy], [CreatedAt], [UpdatedAt], [Deleted]) VALUES (N'4', N'4', N'4', CAST(N'2016-03-17 00:00:00.000' AS DateTime), NULL, NULL, NULL, CAST(N'2016-03-17T14:27:26.8184427+00:00' AS DateTimeOffset), CAST(N'2016-03-17T14:28:11.7414427+00:00' AS DateTimeOffset), 0)
GO
INSERT [CompostConnect].[SourceOwners] ([Id], [FirstName], [LastName], [Email], [ContactNo], [UserType], [Password], [IsActive], [CreatedBy], [ModifiedBy], [SourceId], [CreatedAt], [UpdatedAt], [Deleted]) VALUES (N'1', N'Aaaaaa', N'Bbbbb', N'a.b@email.com', NULL, N'House Owner', N'password', 1, NULL, NULL, NULL, CAST(N'2016-03-17T14:16:00.4104427+00:00' AS DateTimeOffset), CAST(N'2016-03-17T14:16:33.3264427+00:00' AS DateTimeOffset), 0)
GO
INSERT [CompostConnect].[SourceOwners] ([Id], [FirstName], [LastName], [Email], [ContactNo], [UserType], [Password], [IsActive], [CreatedBy], [ModifiedBy], [SourceId], [CreatedAt], [UpdatedAt], [Deleted]) VALUES (N'2', N'Cccccc', N'Dddddd', N'c.d@email.com', NULL, N'Apartment Owner', N'password', 1, NULL, NULL, NULL, CAST(N'2016-03-17T14:16:00.4104427+00:00' AS DateTimeOffset), CAST(N'2016-03-17T14:17:12.2064427+00:00' AS DateTimeOffset), 0)
GO
INSERT [CompostConnect].[SourceOwners] ([Id], [FirstName], [LastName], [Email], [ContactNo], [UserType], [Password], [IsActive], [CreatedBy], [ModifiedBy], [SourceId], [CreatedAt], [UpdatedAt], [Deleted]) VALUES (N'3', N'Eeeeeee', N'Ffffffffff', N'e.f@email.com', NULL, N'Market Owner', N'password', 1, NULL, NULL, NULL, CAST(N'2016-03-17T14:16:00.4104427+00:00' AS DateTimeOffset), CAST(N'2016-03-17T14:18:09.5464427+00:00' AS DateTimeOffset), 0)
GO
INSERT [CompostConnect].[SourceOwners] ([Id], [FirstName], [LastName], [Email], [ContactNo], [UserType], [Password], [IsActive], [CreatedBy], [ModifiedBy], [SourceId], [CreatedAt], [UpdatedAt], [Deleted]) VALUES (N'4', N'Ggggggg', N'Hhhhhh', N'g.h@email.com', NULL, N'Hotel Owner', N'password', 1, NULL, NULL, NULL, CAST(N'2016-03-17T14:16:00.4104427+00:00' AS DateTimeOffset), CAST(N'2016-03-17T14:18:16.5654427+00:00' AS DateTimeOffset), 0)
GO
