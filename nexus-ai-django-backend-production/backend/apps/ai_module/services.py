import os
import time
import random

class AISpeakerService:
    @staticmethod
    def execute_prompt(prompt_text: str, model: str = "gpt-4o-mini"):
        start_time = time.time()
        api_key = os.getenv("OPENAI_API_KEY", "")
        
        # If no key configured or starts with 'sk-proj-your', fall back to Mock mode
        if not api_key or "your-openai" in api_key:
            time.sleep(random.uniform(0.15, 0.45))
            words = prompt_text.split()
            latency = int((time.time() - start_time) * 1000)
            mock_resp = (
                f"[NEXUS MOCK AI ENGINE] Processed {len(words)} input tokens successfully using {model}. "
                f"Synthetic completion: Analysis indicates high structural coherence across scalable Django architecture."
            )
            p_tokens = max(10, len(words) * 2)
            c_tokens = 45
            return {
                "response": mock_resp,
                "model": f"{model}-mock",
                "prompt_tokens": p_tokens,
                "completion_tokens": c_tokens,
                "total_tokens": p_tokens + c_tokens,
                "latency_ms": latency
            }
        
        # Real OpenAI implementation when valid key exists
        try:
            from openai import OpenAI
            client = OpenAI(api_key=api_key)
            completion = client.chat.completions.create(
                model=model,
                messages=[{"role": "user", "content": prompt_text}]
            )
            latency = int((time.time() - start_time) * 1000)
            choice = completion.choices[0]
            usage = completion.usage
            return {
                "response": choice.message.content,
                "model": completion.model,
                "prompt_tokens": usage.prompt_tokens,
                "completion_tokens": usage.completion_tokens,
                "total_tokens": usage.total_tokens,
                "latency_ms": latency
            }
        except Exception as e:
            # Safe recovery fallback
            latency = int((time.time() - start_time) * 1000)
            return {
                "response": f"[API FALLBACK] Processed prompt offline due to network/API quota: {str(e)[:100]}",
                "model": "fallback-engine",
                "prompt_tokens": 15,
                "completion_tokens": 25,
                "total_tokens": 40,
                "latency_ms": latency
            }