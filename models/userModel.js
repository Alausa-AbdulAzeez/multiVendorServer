const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [4, "Password cannot be less than 4 characters"],
    },
    phoneNumber: String,
    address: [
      {
        country: String,
      },
      {
        city: String,
      },
      {
        address: String,
      },
      {
        zipCode: Number,
      },
    ],
    role: {
      type: String,
      default: "user",
    },
    avatar: {
      type: String,
      default:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAAbFBMVEX5+vxAPz3///85NjSIiIn8/f87Ojg2NTM5ODVBPj00MzDW1tb5+fkvLix4d3c+PDoqKSazs7Pc3NxwcG/v7+99fXxIR0fAwMBXVlXLy8xSUVFcXFthYWCXl5jn5+isrKygoKAkIh8dGxgTEgzbx8sjAAAEBUlEQVR4nO2aa5OiOhCGh9YQboEAAeQioPv//+MJOq6c1dHc2q3a4vkwNTXzgdfu5u1Ox6+vjY2NjY2NDRxgxd94PgHRzlXf1XXXV3MrPq1CPr9Ja8qon0kC+UudNgLI5xSAmDpGvW/Cy0/Kuin5WCQgr1nmPZCxOv+MBhApfyJgCYfPU/EBERB30VMBF6IuRtcAbeD/rMDz/KBF1gDt+ZWApSLOuBogDt4okBoCzFwQ0b3MwncuDgJPAlQvKvFOVKGFARquosDzeIOlITk894MHsi7BUQA5D9UkhBzJJpNeMQgyDD1KGKBlqgo8j6GYA+zp+0ffoHsECdITlPOwFKRwPzyQWEOB1BC7lwC5RinIYkCwBtgrOeONaEaQkGpUo6zHFEHC8L5JrggGBAm9noT+35QwKIwKyInQLEeEmQHmv/9SNlrWFDUIBl3o1EIWFggHTOWZacHv3QuQmTjqzAtHjHmBxOqvRBYhNEopISmVzSkoE5RdA7SKM7yc4tEOdaqdajcgCZAnStWjTIF3nFJ7KRiCM96QFanwVlCkWrwC4/ujtd+NqJs3GKM3GnyKvW4iY/cyFxFyDK4ayhc1ycpPrNxIMp92zwXs+IxZiSugKLn/2DZ9Xko/QNosrCEy0EDi0mfruswC5pfx9X/YCmDMl00zQDENNWURDXY0YrQepmLZxRORj/CFqYLAFJyGePmkBGBs82OVptUxb0ci/0YIxMOJTgTTmYqBh6F/rmK4qCC3CxFy1RRXZ5kd3iO2iMa/tsodLZtxnfVFzNgM9GoZgY8wu16Z71cAAe/SqRgTkM8mkIzFlNb8d31mfEYRQCruhf97B07eoUyrKi0P3okHq7c09HiFICAZHo8yWeZfyB5Ngg2uDYKIkiouHb8DEZVut00kqbTOUpc4VE7jAHvlyXWlweXiD2btGMhUhA4HOOWx9U+4q8sRvaXnGt/VAhT0S/GGo8sRyA3TsODkVoCI2jANC1ntIBVw1Frw/Elkf8qH4peNAs/7Zdm5yVeSaq0bHwlsG5axJdzhdtsOAuprjR/DUFplgrRWtXiFtjZhANtKuITBxp+IsK6EBW7hDZpL35+IJvMwJDbGeMfi/pgU774vocjZ2J4svfmOuUsLna3zK7Le8EsVEDsKggyDoUMaTYzPMZ0iodS6jXqFqUkLVwIWjIpBZ/n/FmpUDJC7lGA0Q8LsUoJRPTqVYHZnCJPLKBh1KtI6mBV+SzAaW4hwZM8XzEYGqJxlwvRg59AYzGxhCcPeUZNge9PJjcAh0low/UDUmy+miegd9OuotznaElExy3bps8ruluSy2ObRzhDGv5fmVhAYm+PekGMzOrmfIGDBB7+pv7GxsbGxsbGx8e/zH+0CPVHvcSxJAAAAAElFTkSuQmCC",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
