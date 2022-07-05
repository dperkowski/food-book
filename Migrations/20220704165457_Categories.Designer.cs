﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using food_book.Data;

#nullable disable

namespace food_book.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20220704165457_Categories")]
    partial class Categories
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.6");

            modelBuilder.Entity("food_book.Category", b =>
                {
                    b.Property<long>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("food_book.Recipe", b =>
                {
                    b.Property<long>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("desc")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("hardLevel")
                        .HasColumnType("INTEGER");

                    b.Property<string>("image")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("time")
                        .HasColumnType("INTEGER");

                    b.HasKey("id");

                    b.ToTable("Recipes");

                    b.HasDiscriminator<string>("Discriminator").HasValue("Recipe");
                });

            modelBuilder.Entity("food_book.User", b =>
                {
                    b.Property<long>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("createdAcc")
                        .HasColumnType("TEXT");

                    b.Property<string>("mail")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<byte[]>("passHash")
                        .IsRequired()
                        .HasColumnType("BLOB");

                    b.Property<byte[]>("passSalt")
                        .IsRequired()
                        .HasColumnType("BLOB");

                    b.HasKey("id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("food_book.UserRecipe", b =>
                {
                    b.HasBaseType("food_book.Recipe");

                    b.Property<bool>("userFavorite")
                        .HasColumnType("INTEGER");

                    b.Property<long>("userId")
                        .HasColumnType("INTEGER");

                    b.HasDiscriminator().HasValue("UserRecipe");
                });
#pragma warning restore 612, 618
        }
    }
}