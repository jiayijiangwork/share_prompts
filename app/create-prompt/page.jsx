'use client'
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Form from "../../components/Form"
const CreatePrompt = () => {
    // Declare a submitting state and a post state
    const [submitting, setsubmitting] = useState(false)
    const [post, setPost] = useState({

        prompt: '',
        tag: '',
    })
    const router = useRouter()
    const { data: session } = useSession()
    // Define a function to create a prompt
    const createPrompt = async (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();
        // Set the submitting state to true
        setsubmitting(true)
        try {
            // Make an HTTP POST request to the 'api/prompt/new' endpoint
            const response = await fetch('api/prompt/new',
                {
                    // Use the POST method
                    method: 'POST',
                    // Use the JSON stringify body
                    body: JSON.stringify({
                        // Assign the post.prompt value to the body
                        prompt: post.prompt,
                        userId: session?.user.id,
                        tag: post.tag
                    })
                })
            if (response.ok) {
                router.push('/')
            }
        } catch (error) {
            // Handle any errors that might occur
            console.log(error)
        } finally {
            // Set the submitting state to false
            setsubmitting(false)
        }
    }

    // Return the form component
    return (
        <Form
            // Set the form type to 'create'
            type="create"
            // Assign the post state to the form's post prop
            post={post}
            // Assign the setPost function to the form's setPost prop
            setPost={setPost}
            // Assign the submitting state to the form's submitting prop
            submitting={submitting}
            // Assign the createPrompt function to the form's handleSubmit prop
            handleSubmit={createPrompt}
        />
    )
}

// Export the CreatePrompt component
export default CreatePrompt