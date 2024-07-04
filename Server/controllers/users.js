import User from "../models/User.js"

export const getUser = async (req, res) => {
    try {
        console.log('hitting here')
        const { id } = req.params;
        const user = await User.findById(id)
        if(!user)
        {
            return res.status(404).json({message: "User with Given Id not found"})
        }
        res.status(200).json(user)
    } catch (err) {
        res.status(401).json({message: err.message})
    }
}

export const getUserFriends = async (req, res) => {
    try {
        console.log("api hitting")
        const { id } = req.params
        const user = await User.findById(id)
        if(!user)
            return res.status(404).json({message: "User with Given Id not found"})

        console.log('user friends are', user.friends)
        
        if(user.friends.length == 0)
            return res.status(404).json({message: "no friends"})

        const userFriends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        const formattedFriends = userFriends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath}) => {
                return { _id, firstName, lastName, occupation, location, picturePath};
            }
        )
        res.status(200).json(formattedFriends)
    } catch (err) {
        res.status(401).json({message: err.message})
    }
}

// update
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params

        if(friendId == id)
            return
        const user = await User.findById(id)
        const friend = await User.findById(friendId)
        if(!user)
            return res.status(404).json({message: "User with Given Id not found"})

        if(!friend)
            return res.status(404).json({message: "Friend with Given Id not found"})

        if(user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId)
            friend.friends = friend.friends.filter((id) => id !== id)
        } else {
            user.friends.push(friendId)
            friend.friends.push(id)
        }

        await user.save()
        await friend.save()

        const userFriends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        const formattedFriends = userFriends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath}) => {
                return { _id, firstName, lastName, occupation, location, picturePath};
            }
        )
        res.status(200).json(formattedFriends)
    } catch (err) {
        res.status(401).json({message: err.message})
    }
}

export const updateUser = async (req, res) => {
    try {
        const { firstName, lastName, location, occupation, twitterProfile, linkedInProfile, instagramProfile } = req.body;
        const userId = req.params.userId;

        console.log('Updating user with userId:', userId);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    firstName,
                    lastName,
                    location,
                    occupation,
                    "socialProfiles.0.twitterProfile": twitterProfile,
                    "socialProfiles.0.linkedInProfile": linkedInProfile,
                    "socialProfiles.0.instagramProfile": instagramProfile,
                },
            },
            { new: true }
        );

        if (!updatedUser) {
            console.error('User not found for userId:', userId);
            return res.status(404).json({ error: "User not found" });
        }

        console.log('User updated successfully:', updatedUser);
        res.status(200).json(updatedUser);

    } catch (err) {
        console.error("Error updating user profile:", err);
        res.status(500).json({ error: "Server error" });
    }
};


export const profileViews = async (req, res) => {
    // console.log('API hitting');
    try {
        const { userId } = req.params;
        console.log('UserID is', userId);
        
        const updatedUser = await User.findById(userId);
        // console.log('UpdatedUser:', updatedUser);
        
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        updatedUser.profileViews += 1;
        await updatedUser.save();
        // console.log('ProfileViews updated');

        res.status(200).json(updatedUser);
    } catch (err) {
        console.error('Error updating profile views:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const impressionCount = async(req, res) => {
    try {
        const { userId } = req.params

        const updatedUser = await User.findById(userId)

        updatedUser.impressions += 1

        await updatedUser.save()

        res.status(200).json(updatedUser)
    } catch (err) {
        console.error("Error updating profile views:", err);
        res.status(500).json({ error: "Server error" });
    }
}

export const searchUsers = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }

        const users = await User.find({
            $or: [
                { firstName: { $regex: query, $options: 'i' } },
                { lastName: { $regex: query, $options: 'i' } }
            ]
        }).select('firstName lastName _id picturePath location occupation');

        res.status(200).json(users);
    } catch (err) {
        console.error("Error searching users:", err);
        res.status(500).json({ error: "Server error" });
    }
}